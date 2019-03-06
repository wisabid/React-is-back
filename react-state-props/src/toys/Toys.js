import React, { Component } from 'react';
import Toy from './Toy'

class Toys extends Component {
    state = {
        users : [
            {name : "Toy car", color: 'Red'},
            {name : "Toy Truck", color: 'Green'},
            {name : "Toy Bus", color: 'Yellow'},
            {name : "Toy Swing", color: 'White'},
            {name : "Toy Tent", color: 'Violet'},
        ]
    }

    altercolor = () => {
        // console.log('clicked', this);
        const arr = ['red', 'violet', 'green', 'orange', 'red'];
        let newState = this.state.users.map((item, i) => {
            item.color = arr[Math.floor(Math.random()* arr.length)];
            return item;
        })
        this.setState(
            newState
        )
    }

    makeonecolor = () => {
        let newstate = this.state.users.map((item) => {
            item.color = "green";
            return item;
        })
        this.setState(
            newstate
        )
    }

    handlechange = (event) => {
        let newstate = this.state.users.map((item, i) => {
            if (i == 0) {
                item.name = event.target.value;
            }            
            return item;
        })

        this.setState(
            newstate 
        )
    }

    changemycolor = (newcolor) => {
        let newstate = this.state.users.map((item) => {
            if (item.name === this.state.users[0].name) {
                item.color = newcolor;
            }
            return item;
        })
        this.setState(
            newstate
        )
    }

    render() {
        return (<div>
            <button onClick={this.altercolor}>Change All</button>
            {
                this.state.users.map((item, i) => {
                    return (<div>
                        <Toy key={i} color={item.color}>{item.name}</Toy> 
                    </div>)
                })
            }
            <button onClick={this.makeonecolor}>Make All Green</button>
            <br />
            <input type="text" onChange={this.handlechange} value={this.state.users[0].name}/>
            <br />
            <button onClick={this.changemycolor.bind(this, this.state.users[2].color)}>Change '{this.state.users[0].name}' color to {this.state.users[2].color}</button>
           </div>)
    }
}
export default Toys;