var Index = {    

    //Application Constructor
    initialize: function() {       
        this.bindEvents();
    },

    //Bind Event Listeners
    bindEvents: function() {        
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("resume", this.onResume, false);
    },
    
    //Event Handle
    onDeviceReady: function() {        
        DataBase.init();

        Usuario.telaIndex();
        /*push = PushNotification.init({
                android: {
                    senderID: ""
                },
                ios: {
                    alert: "true",
                    badge: "true",
                    sound: "true"
                },
                windows: {}
            });    
                      
        push.on('registration', function(data) {
            console.log(data.registrationId);
            User.setDeviceId(data.registrationId);
        });

        push.on('notification', function(data) {
            console.log(data.message);
            Funcoes.alerta(data.message, 'Grupo Cometa');
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
        });

        push.on('error', function(e) {
            console.log(e.message);
        });*/

    },

    //Event Handle
    onResume: function() {        
      
    }
};

