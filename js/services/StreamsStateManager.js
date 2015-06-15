(function () {
    app.service('StreamsStateManager', function () {
        this.streams = [{
            id: 0,
            channel: 'clgdoublelift'
        },{
            id: 1,
            channel: 'red'
        },{
            id: 2,
            channel: 'green'
        },{
            id: 3,
            channel: 'silver'
        }];

        this.activeStream = {stream: {id: '',channel: ''}};
        this.previewStream = {stream: {id: '',channel: ''}};

        this.setActiveStream = function (id) {
            if (this.previewStream.stream.id === id) this.previewStream.stream = {id: '',channel: ''};
            if (this.activeStream.stream.id !== id) {
                this.activeStream.stream = this.streams[id];
            } else {
                this.activeStream.stream = {id: '',channel: ''};
            }
        };

        this.setPreviewStream = function (id) {
            if (id === this.activeStream.stream.id) return;
            if (this.previewStream.stream.id !== id) {
                this.previewStream.stream = this.streams[id];
            } else {
                this.previewStream.stream = {id: '',channel: ''};
            }
        };

        this.removeStream = function (id) {
            if (this.activeStream.stream.id === id) this.activeStream.stream = {id: '',channel: ''};
            if (this.previewStream.stream.id === id)  this.previewStream.stream = {id: '',channel: ''};
            this.streams[id].channel = '';
        }
    });
})();