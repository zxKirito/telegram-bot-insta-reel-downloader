const axios = require('axios');
const fs = require('fs');

async function testDownload() {
    try {
        const videoUrl = 'https://instagram.fluh1-2.fna.fbcdn.net/o1/v/t2/f2/m86/AQNtEAX_V1VUzk_U7uP4vWwOlflNYrSgbtZ0JsyphJ3129if3H0cLwzX7T53WkkrfVw9Nk6uFzOs9jY0_LzxE7AAXo9UAGeRLh3Iu0k.mp4?_nc_cat=105&_nc_oc=AdlBUDDR_95JIYZLmgiJS0uj-ZOM93X_cCv0h2PXOFP6i3dhW7iqzx5mXUCyPJYA9wCpsOOWHAqIEXTXQvs0kFZb&_nc_sid=5e9851&_nc_ht=instagram.fluh1-2.fna.fbcdn.net&_nc_ohc=ua_ldh7zAWEQ7kNvwFHNXoy&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTc5MDk4NzMwNzYzMjM0MzEsImFzc2V0X2FnZV9kYXlzIjoxOSwidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjE0MCwidXJsZ2VuX3NvdXJjZSI6Ind3dyJ9&ccb=17-1&_nc_gid=mq9o4vHsOxi2wCkpzzY2kg&_nc_zt=28&vs=8fd1e03d03089633&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC85NzRDN0YwNUZCODZEQ0ZBMURCOTQ1MzczODQxOEM5Ql92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzlGNERGNTczMTYzNjI0RjFDMjZDMTQ3RjBCNTY4RTkxX2F1ZGlvX2Rhc2hpbml0Lm1wNBUCAsgBEgAoABgAGwKIB3VzZV9vaWwBMRJwcm9ncmVzc2l2ZV9yZWNpcGUBMRUAACbOkf7q6LvQPxUCKAJDMywXQGGDMzMzMzMYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HZeadAQA&oh=00_AftOP8v0Tp0n7Mb33n_-VdI83-kod9z1BLNWXAiDvEopjw&oe=69A2CF4A';

        console.log("Downloading video to memory...");
        const response = await axios({
            method: 'GET',
            url: videoUrl,
            responseType: 'arraybuffer' // Get as buffer
        });

        console.log(`Downloaded ${response.data.length / 1024 / 1024} MB`);

        fs.writeFileSync('test.mp4', response.data);
        console.log("Saved test.mp4");

    } catch (err) {
        console.error("Error:", err.message);
    }
}

testDownload();
