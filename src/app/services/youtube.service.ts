import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import {PickerDisplayGroup} from '../declarations/declarations'

@Injectable()
export class YoutubeService {

    constructor(private http: Http) { }

    getFeaturedVideos (amount: number, page: number): Promise<PickerDisplayGroup> {
        return new Promise((resolve, reject) => {
            this.http.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&maxResults=${amount}&chart=mostPopular&key=AIzaSyCwDuzMYGZ2daIs7NLbeQmSMYy8tvt3Nrc`)
            .toPromise().then(response => {
                resolve (YoutubeService.transformVideosToPickerDisplayGroup(response.json()));
            });
        });
    };

    search (query: string, amount: number, page: number): Promise<PickerDisplayGroup> {
        return new Promise((resolve, reject) => {
            this.http.get(`https://content.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=AIzaSyCwDuzMYGZ2daIs7NLbeQmSMYy8tvt3Nrc`)
                .toPromise().then(response => {
                resolve (YoutubeService.transformVideosToPickerDisplayGroup(response.json()));
            });
        });
    };

    static transformVideosToPickerDisplayGroup(rawData: any): PickerDisplayGroup {
        let pickerDisplayGroup: PickerDisplayGroup;
        pickerDisplayGroup = {image: '../../assets/images/youtube-logo.png',
            title: 'YouTube',
            subtitle: 'Trending videos',
            description: 'Most popular videos',
            headerLeadsTo: 'youtube',
            itemLeadsTo: 'picking-done',
            items: []
        };
        for (let i = 0; i < rawData.items.length; i++) {
            let subtitle = rawData.items[i].statistics ? rawData.items[i].statistics.viewCount+' views, '+rawData.items[i].statistics.likeCount+' likes' : 'blah';
            let code = typeof rawData.items[i].id === 'object' ? rawData.items[i].id.videoId : rawData.items[i].id;
            pickerDisplayGroup.items.push({
                image: rawData.items[i].snippet.thumbnails.medium.url,
                title: rawData.items[i].snippet.title,
                subtitle: subtitle,
                description: '',
                code: code,
                playerHtml: `<iframe src="https://www.youtube.com/embed/${code}" width="100%" height="100%" frameborder="0" scrolling="0" allowfullscreen="true"></iframe>`,
                chatHtml: ''
            })
        }
        return pickerDisplayGroup;
    }
}