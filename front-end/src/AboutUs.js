import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

/**
 * A React component that displays the about us info.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutData, setAboutData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * A nested function that fetches about us data from the back-end server.
   */
  const fetchAboutData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const about = response.data.about
        setAboutData(about)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2)
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  // set up loading data from server when the component first loads
  useEffect(() => {
    fetchAboutData()
  }, []) // putting a blank array as second argument will cause this to run only once when component first loads

  return (
    <>
      <h1>About Us</h1>
      {error && <p className="error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}
      {loaded && aboutData && aboutData.length > 0 && (
        <div className="about-content">
          {aboutData.map((item, index) => (
            <article key={item._id || index} className="about-item">
              <h2>{item.name}</h2>
              <div className="about-text">
                {item.about.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
              {item.image && (
                <div className="about-image">
                  <img src={item.image} alt={item.name} />
                </div>
              )}
            </article>
          ))}
        </div>
      )}
      {loaded && (!aboutData || aboutData.length === 0) && (
        <p>No about us information available.</p>
      )}
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs