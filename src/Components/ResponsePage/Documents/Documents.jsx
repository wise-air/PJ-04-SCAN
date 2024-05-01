import css from "./Documents.module.css"
import {Component} from "react";
import axios from "axios";
import Document from "./Document/Document";

class Documents extends Component {

    queue_step = 2
    documentsUrl = 'https://gateway.scan-interfax.ru/api/v1/documents'

    constructor(props) {
        super(props);
        this.state = {
            queue: 0,
            loaded: null
        }
        this.config = {
            headers: {
                Authorization: `Bearer ${props.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        }
        this.loading = this.loading.bind(this)
    }

    loading() {
        let queue = this.state.queue
        const ids = this.props.objects.slice(queue, queue + this.queue_step)
        if (ids.length) {
            const new_queue = queue + ids.length
            const request = {ids: ids.map(item => item.encodedId)}
            const new_loaded = this.state.loaded ? [...this.state.loaded] : []

            axios
                .post(this.documentsUrl, request, this.config)
                .then(response => {
                    new_loaded.push(...response.data.map(item => item.ok))
                    this.setState({
                        queue: new_queue,
                        loaded: new_loaded
                    })
                })
                .catch((error) => {
                })
        }
    }

    componentDidMount() {
        if (this.props.objects) {
            this.loading()
        }
    }

    render() {
        return this.state.loaded ?
            <div className={css.documents}>
                <h2 className={css.head}>
                    Список документов
                </h2>
                <div className={css.content}>
                    {this.state.loaded.map(item => <Document key={item.id} doc={item}/>)}
                </div>
                {this.props.objects.length > this.state.queue ?
                    <div className={css.more}>
                        <button className={css.moreButton} onClick={this.loading}>
                            Показать больше
                        </button>
                    </div>
                    : ""}
            </div>
            : ""
    }
}

export default Documents