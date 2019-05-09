import React, {Component} from 'react'
import axios from 'axios'

/**
 * COMPONENT
 */
export default class Routes extends Component {
  constructor() {
    super()
    this.state = {
      pictures: [],
      search: '',
      graphics: [],
      selectedPictures: [],
      selectedGraphics: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    event.preventDefault()
    this.setState({
      search: event.target.value
    }, )
  }
  handleSubmit(event) {
    event.preventDefault()
    const query = this.state.search
    const picResult = this.state.pictures.filter(pic => {
      if (pic.credit.indexOf(query) > 0 || pic.caption.indexOf(query)) {
        return true
      } else {
        return false
      }
    })
    this.setState({
      selectedPictures: picResult
    })
    console.log('selectedPictures', this.state.selectedPictures)
  }
  async componentDidMount() {
    const imageData = await axios.get(
      'https://hanilim.github.io/newsroomtools-test2019-assets/api/im.json'
    )
    const graphicsData = await axios.get(
      'https://hanilim.github.io/newsroomtools-test2019-assets/api/graphics.json'
    )
    // const graphic = [...graphicsData.data.featured, graphicsData.data.recent]
    // console.log(graphic)
    const img = imageData.data.images
    this.setState({
      pictures: img,
      // graphics: graphic,
      selectedPictures: img
    })
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" />
          <input type="submit" />
        </form>
        <div>
          {this.state.selectedPictures.map(pic => (
            <React.Fragment>
              <img src={pic.href} />
              <figure>{pic.credit}</figure>
              <figcaption>{pic.caption}</figcaption>
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
    )
  }
}
