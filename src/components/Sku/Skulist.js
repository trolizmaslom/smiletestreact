import React, {Component} from 'react';
import Sku from "./Sku";
export class Skulist extends Component {
    state = {
        error: null,
        isLoaded: false,
        items: [],
        totalPrice: null,
        prices:[]
    };

    componentDidMount(){
        fetch("https://5d2445dce39785001406ec62.mockapi.io/SKU")
            .then(res => res.json())
            .then((result) => {
                const mixedData = result.reduce((res,item) => {
                    let price = item.sku.length > 0 ? parseInt(item.sku[0].price, 10): 0;
                    res.summ = res.summ || 0;
                    res.summ += price;
                    res.prices =  res.prices || [];
                    res.prices.push({
                        id: item.id,
                        price: price
                    });
                    return res;
                }, {});
                this.setState({
                    isLoaded: true,
                    items: result,
                    prices: mixedData.prices,
                    totalPrice: mixedData.summ
                });

            });
    }
    chengedTotal = (price, id) => {
        let arr = this.state.prices;
        for (let i in arr) {
            if (arr[i].id === id) {
                arr[i].price = price;
                break;
            }
        }
        this.calculateTotal();
    };
    deleteItem = (id) => {
       let newItems = this.state.items.filter(item => {
           return item.id !== id;
       });
        let newPrices = this.state.prices.filter(item => {
            return item.id !== id;
        });
        this.setState({
            items: newItems,
            prices: newPrices,
        }, this.calculateTotal);
    };
    calculateTotal = () =>{
        let result = this.state.prices.reduce((summ, item) => {
            return summ + item.price;
        }, 0);
        this.setState({totalPrice: result});
    };
    render(){
        const { isLoaded, items, totalPrice } = this.state;
        if (!isLoaded ) return (<h3>LOADING ...</h3>);
        const list = items.map(item =>
            <Sku key = {item.id} item = {item} chengedTotal = {this.chengedTotal} deleteItem={this.deleteItem}/>
        );
        return (
            <div className = "card">
                {list}
                <div className = "totalprice">{totalPrice} €</div>
            </div>
        );
    }
}

export default Skulist;