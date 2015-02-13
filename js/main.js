var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert("Native:"+message, null, title, 'OK');
        } else {
            alert("alert...."+title ? (title + ": " + message) : message);
        }
    },

    changePicture: function () {

        event.preventDefault();
        if (!navigator.camera) {
            app.showAlert("Camera API not supported", "Error");
            return;
        }
        var options =   {   quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                            encodingType: 0     // 0=JPG 1=PNG
                        };
     
        navigator.camera.getPicture(
            function(imageData) {
                $('.employee-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
            },
            function() {
                app.showAlert('Error taking picture', 'Error');
            },
            options);
     
        return false;

    },

    initialize: function() {
        console.log("init");
        var self = this;
        this.store = new MemoryStore(function(){
            self.showAlert("store initialized", "Info");
        });

        $(".change-pic-btn").click(self.changePicture);
    }

};

app.initialize();