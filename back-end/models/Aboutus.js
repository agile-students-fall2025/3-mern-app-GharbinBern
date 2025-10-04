const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aboutusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    image: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
)

// create mongoose Model
const AboutUs = mongoose.model('AboutUs', aboutusSchema)

// export the model so other modules can import it
module.exports = {
  AboutUs,
}
