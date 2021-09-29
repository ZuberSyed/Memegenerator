import React from "react"

export default class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state={
            // isLoading:true,
            topText:"",
            bottomText:"",
            randomImg:"https://images.mktw.net/im-330506?width=1280&size=1.77777778",
            allImages: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
             .then(res => {
                 const {memes} =res.data
            this.setState({ allImages: memes })
        })
    }
    handleChange(event){
        const {name,value} = event.target
        this.setState({ [name] :value})
    }
    handleSubmit(event){
        event.preventDefault()
        const randomNum = this.state.allImages[Math.floor(Math.random() * this.state.allImages.length)].url
        this.setState({ randomImg: randomNum })
    }
    render(){
        return(
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="topText"
                        value={this.state.topText}
                        onChange={this.handleChange}
                        placeholder="Enter top text"
                    />
                    <input
                        type="text"
                        name="bottomText"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                        placeholder="Enter bottom text"
                    />
                    <button className="btn">Gen</button>
                    </form>
                    <div className="meme">
                    <img src={this.state.randomImg} alt="" className="memeImg"/>
                    <h2 className="topTxt">{this.state.topText}</h2>
                    <h2 className="bottomTxt">{this.state.bottomText}</h2>
                    </div>
            </div>
        )
    }

    }    
