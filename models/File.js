const mongoose =require('mongoose');

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    tags:{
        type:String
    },
    email:{
        type:String,
        required:true
    }
});

fileSchema.post('save', async function(doc){
    try{
        console.log('DOC', doc)
        let  trnasporter = nodemailer.transporter({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from:`send mail by ritesh`,
            to:doc.email,
            subject:'new file uploaded on cloudinary..',
            html:`<h2>hello jee kya hal chal</h2><p>file uploaded</p>`
        })

        console.log('INFO',info)

    }catch{
        console.log(error)
    }
})

module.exports = mongoose.model('File',fileSchema);

