// Run this with: node addAboutUsData.js

const mongoose = require('mongoose')
const { AboutUs } = require('./models/Aboutus')

// Load environment variables
require('dotenv').config({ silent: true })

// Connect to database with timeout settings
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message)
    console.log('Make sure your MongoDB database is running!')
    process.exit(1)
  })

// about us data
const myAboutUsData = {
  name: "Gharbin Bernard",
  about: "Hello! I'm a computer science student with a growing passion for full-stack web development.\n\nI love working with data—cleaning it, analyzing it, and turning it into something meaningful. Now I'm channeling that passion into building web applications using the MERN stack (MongoDB, Express, React, Node.js).\n\nThis project showcases my ability to design both frontend and backend components, making them work together seamlessly to solve real problems. I enjoy bridging logic and creativity—structuring databases one moment, refining user experiences the next.\n\nOutside of coding, you'll find me trying out new sports (sometimes successfully, sometimes hilariously not). I believe in balancing learning, challenge, and fun both on and off the screen!",
  image: "https://i.postimg.cc/LXgvRWyW/IMG-2360.jpg"
}

// Add data to database
async function addAboutUsData() {
  try {
    // Clear any existing data
    await AboutUs.deleteMany({})
    
    // Add data
    const aboutUs = new AboutUs(myAboutUsData)
    await aboutUs.save()
    
    console.log('About Us data added successfully!')
    console.log('Data:', myAboutUsData)
    
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

addAboutUsData()