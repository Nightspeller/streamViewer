import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import {PickerDisplayGroup} from '../declarations/declarations'

@Injectable()
export class TwitchService {

    private headers = new Headers();



    constructor(private http: Http) {
        this.headers.append('Accept', 'application/vnd.twitchtv.v5+json');
        this.headers.append('Client-ID', 'aoj81mhxdidmwxqw05lm73wt7s2p3sg');
    }

    getGames (amount: number, page: number): Promise<PickerDisplayGroup> {
        return new Promise((resolve, reject) => {
            this.http.get(
                `https://api.twitch.tv/kraken/games/top?limit=${amount}&offset=${page * amount}`,
                {headers: this.headers}
            ).toPromise().then(response => {
                resolve (TwitchService.transformGamesToPickerDisplayGroup(response.json()));
            });
        });
    };

    getFeaturedStreams (amount: number, page: number): Promise<PickerDisplayGroup> {
        return new Promise((resolve, reject) => {
            this.http.get(
                `https://api.twitch.tv/kraken/streams?limit=${amount}&offset=${page * amount}`,
                {headers: this.headers}
            ).toPromise().then(response => {
                resolve (TwitchService.transformStreamsToPickerDisplayGroup(response.json()));
            });
        });
    };

    getStreamsForGame (amount: number, page: number, game: string): Promise<PickerDisplayGroup> {
        return new Promise((resolve, reject) => {
            this.http.get(
                `https://api.twitch.tv/kraken/streams?game=${game}&limit=${amount}&offset=${page * amount}`,
                {headers: this.headers}
            ).toPromise().then(response => {
                resolve (TwitchService.transformStreamsToPickerDisplayGroup(response.json()));
            });
        });
    };

    getUserFollows (amount: number, page: number, user: string): Promise<PickerDisplayGroup> {
        if (user) {
            return new Promise((resolve, reject) => {
                this.http.get(
                    `https://api.twitch.tv/kraken/users?login=${user}&api_version=5`,
                    {headers: this.headers}
                ).toPromise().then(userResponse => {
                    this.http.get(
                        `https://api.twitch.tv/kraken/users/${userResponse.json().users[0]._id}/follows/channels`,
                        {headers: this.headers}
                    ).toPromise().then(response => {
                        this.prepareUserFollows(amount, response.json()).then(pickerDisplayGroup => resolve(pickerDisplayGroup));
                    });
                });

            });
        } else {
            return new Promise((resolve, reject) => {
                let pickerDisplayGroup: PickerDisplayGroup;
                pickerDisplayGroup = {
                    image: '../../assets/images/twitch-logo.jpg',
                    title: 'Twitch.tv',
                    subtitle: 'You follow',
                    description: 'You follow',
                    headerLeadsTo: '',
                    itemLeadsTo: 'user-settings',
                    items: [{
                        image: '../../assets/images/twitch-logo.jpg',
                        title: 'Please enter your (or any other) user name to get followed channels',
                        subtitle: `Introduce yourself`,
                        description: '',
                        code: '',
                        playerHtml: '',
                        chatHtml: ''
                    }]
                };

                resolve (pickerDisplayGroup);
            });
        }
    };

    searchForGame (query: string, amount: number, page: number): Promise<PickerDisplayGroup> {
        return new Promise((resolve, reject) => {
            this.http.get(
                `https://api.twitch.tv/kraken/search/games?query=${query}&limit=${amount}&offset=${page * amount}&live=true`,
                {headers: this.headers}
            ).toPromise().then(response => {
                let rawData = response.json();
                console.log('games', rawData);
                let pickerDisplayGroup: PickerDisplayGroup;
                pickerDisplayGroup = {
                    image: '../../assets/images/twitch-logo.jpg',
                    title: 'Twitch.tv',
                    subtitle: 'Featured games',
                    description: 'Featured games',
                    headerLeadsTo: '',
                    itemLeadsTo: 'tw-streams-search',
                    items: []
                };
                for (let i = 0; i < rawData.games.length; i++) {
                    pickerDisplayGroup.items.push({
                        image: rawData.games[i].box.medium,
                        title: rawData.games[i].name,
                        subtitle: `${rawData.games[i].popularity} viewers`,
                        description: '',
                        code: rawData.games[i].name,
                        playerHtml: '',
                        chatHtml: ''
                    })
                }
                resolve (pickerDisplayGroup);
            });
        });
    };

    searchForStreamer (query: string, amount: number, page: number): Promise<PickerDisplayGroup> {
        return new Promise((resolve, reject) => {
            this.http.get(
                `https://api.twitch.tv/kraken/search/streams?query=${query}&limit=${amount}&offset=${page * amount}`,
                {headers: this.headers}
            ).toPromise().then(response => {
                resolve (TwitchService.transformStreamsToPickerDisplayGroup(response.json()));
            });
        });
    };

    static transformGamesToPickerDisplayGroup(rawData: any): PickerDisplayGroup {
        let pickerDisplayGroup: PickerDisplayGroup;
        pickerDisplayGroup = {
            image: '../../assets/images/twitch-logo.jpg',
            title: 'Twitch.tv',
            subtitle: 'Featured games',
            description: 'Featured games',
            headerLeadsTo: 'tw-games',
            itemLeadsTo: 'tw-streams-search',
            items: []
        };
        for (let i = 0; i < rawData.top.length; i++) {
            pickerDisplayGroup.items.push({
                image: rawData.top[i].game.box.medium,
                title: rawData.top[i].game.name,
                subtitle: `${rawData.top[i].viewers} viewers at ${rawData.top[i].channels} channels`,
                description: '',
                code: rawData.top[i].game.name,
                playerHtml: '',
                chatHtml: ''
            })
        }
        return pickerDisplayGroup;
    }

    static transformStreamsToPickerDisplayGroup(rawData: any): PickerDisplayGroup {
        console.log('streams', rawData);
        let pickerDisplayGroup: PickerDisplayGroup;
        pickerDisplayGroup = {
            image: '../../assets/images/twitch-logo.jpg',
            title: 'Twitch.tv',
            subtitle: 'Top streams',
            description: 'Top streams',
            headerLeadsTo: 'tw-streams',
            itemLeadsTo: 'picking-done',
            items: []
        };
        for (let i = 0; i < rawData.streams.length; i++) {
            pickerDisplayGroup.items.push({
                image: rawData.streams[i].preview.medium,
                title: `<span class="highlighted">${rawData.streams[i].channel.display_name}</span> playing ${rawData.streams[i].channel.game}`,
                subtitle: rawData.streams[i].viewers+' viewers',
                description: rawData.streams[i].channel.status,
                code: rawData.streams[i].channel.name,
                playerHtml: `<iframe src="https://player.twitch.tv/?channel=${rawData.streams[i].channel.name}" width="100%" height="100%" frameborder="0" scrolling="0" allowfullscreen="true"></iframe>`,
                chatHtml: `<iframe src="https://www.twitch.tv/embed/${rawData.streams[i].channel.name}/chat" width="100%" style="flex-grow: 1" frameborder="0" scrolling="0" allowfullscreen="true"></iframe>`
            })
        }
        return pickerDisplayGroup;
    }

    prepareUserFollows(amount: number, userFollows: any): Promise<PickerDisplayGroup> {
        let url = `https://api.twitch.tv/kraken/streams?channel=`;
        for (let i = 0; i < userFollows.follows.length; i++) {
            url += userFollows.follows[i].channel._id+',';
        }
        return new Promise((resolve, reject) => {
            this.http.get(
                url,
                {headers: this.headers}
            ).toPromise().then(data => {
                let pickerDisplayGroup = TwitchService.transformStreamsToPickerDisplayGroup(data.json());
                pickerDisplayGroup.headerLeadsTo = 'tw-user-follows';
                pickerDisplayGroup.subtitle = 'You follow';
                if (pickerDisplayGroup.items.length > amount) {
                    pickerDisplayGroup.items = pickerDisplayGroup.items.slice(0,amount);
                }
                resolve(pickerDisplayGroup);
            })
        });
    }
}
