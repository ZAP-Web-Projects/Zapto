import React from 'react';
import Navbar from './navbar';
import '../css/add.css';
import axios from 'axios';
import cookie from 'js-cookie';

export default class Edit extends React.Component {
    constructor() {
        super()
        this.state = {
            content: "",
            color: ["#B71C1C", "#880E4F", "#4A148C", "#311B92", "#1A237E"],
            selected_color: "",
            labels: ["Personal", "Work", "Shopping", "Other"],
            selected_label: "",
            due_date: "",
            status: "",
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/todo/api/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    content: res.data.content,
                    selected_color: res.data.color,
                    selected_label: res.data.label,
                    due_date: res.data.due_date,
                    status: res.data.status,
                    loading: false
                })                
                console.log(res.data);
            })
            .catch(err => {
                this.setState({loading:false, error:true})
                console.log(err);
            })

    }

    contentChange = e => {
        this.setState({
            content: e.target.value
        })
    }

    selectColor = e => {
        this.setState({
            selected_color: e.target.value
        })
    }

    selectLabel = e => {
        this.setState({
            selected_label: e.target.value
        })
    }
    setStatus = e => {
        this.setState({
            status: e.target.value
        })
    }

    date = e => {
        this.setState({
            due_date: e.target.value
        })
    }

    onSubmit = e => {
        const user = cookie.get('user');
        const data = {
            user_id: user,
            content: this.state.content,
            due_date: this.state.due_date,
            color: this.state.selected_color,
            label: this.state.selected_label,
            status: this.state.status
        }        
        axios.put("http://localhost:8080/todo/" + this.props.match.params.id, data)
            .then(res => res.data)
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const colors = this.state.color;
        let color_list;

        color_list = colors.map((colors, k) =>
            <option style={{ backgroundColor: colors, paddingTop: '5px', paddingBottom: '5px', color: '#FFF' }} value={colors}>{colors}</option>
        );

        const labels = this.state.labels;
        let label_list;
        label_list = labels.map((labels, k) =>
            <option value={labels}>{labels}</option>
        );
        if (this.state.loading) {
            return (
                <div className="container" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>LOADING...</h1>
                </div>
            )
        }
        if (this.state.error) {
            return (
                <div>
                    <p> An error occured </p>
                </div>
            )
        }

        return (
            <div>
                <Navbar />
                <div className="container" style={{ paddingTop: '100px' }}>
                    <center><h3>Edit Todo Item</h3></center>
                    <hr></hr>
                    <form>
                        <div className="form-row">
                            <h3>Content: {this.state.content}</h3>
                        </div>
                        <div className="form-row">
                            <input onChange={this.contentChange.bind(this)} className="form-control" type="text" value={this.state.content} />
                        </div>
                        <div className="form-row">
                            <h3>Label: {this.state.selected_label}</h3>
                        </div>
                        <div className="form-row">
                            <select defaultValue={this.state.selected_label} onChange={this.selectLabel} className="form-control">
                                <option value="">Select Label</option>
                                {label_list}
                            </select>
                        </div>
                        <div className="form-row">
                            <h3>Status</h3>
                        </div>
                        <div className="form-row">
                            <select defaultValue={this.state.status} onChange={this.setStatus} className="form-control">
                                <option value="">Select Status</option>
                                <option value="true">Active</option>
                                <option value="false">Finished</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <h3>Color : {this.state.selected_color}</h3>
                        </div>
                        <div className="form-row">
                            <select defaultValue={this.state.selected_color} onChange={this.selectColor} className="form-control">
                                <option value="">Select Color</option>
                                {color_list}
                            </select>
                        </div>
                        <div className="form-row">
                            <h3>Due Date : {this.state.due_date}</h3>
                        </div>
                        <div className="form-row">
                            <input onChange={this.date.bind(this)} type="date" className="form-control" value={this.state.due_date}></input>
                        </div>
                        <div className="form-row">
                            <button type="submit" onClick={this.onSubmit.bind(this)} className="btn btn-primary">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}