import React from 'react';
import {socketConnect} from 'socket.io-react';
class LeadForm extends React.Component {
    render() {
        return (
            <form action="" className="new_bid_form" id="lead-form">
                <div className="form-group">
                    <label htmlFor="client_name">Имя</label>
                    <input type="text" data-field-name="Имя" className="form-control" name="client_name"
                           id="client_name" placeholder="Введите имя"/>
                </div>
                <div className="form-group">
                    <label htmlFor="client_city">Город</label>
                    <input type="text" data-field-name="Город" className="form-control" name="client_city"
                           id="client_city" placeholder="Например: Москва"/>
                </div>
                <div className="form-group">
                    <label htmlFor="client_phone">Номер телефона</label>
                    <input type="tel" data-field-name="Номер телефона" className="form-control"
                           name="client_phone"
                           id="client_phone" placeholder="Введите телефон"/>
                </div>
                <div className="form-group">
                    <button className="venyoo_btn venyoo_cta js-save-lead" type="submit">
                        Сохранить лид
                    </button>
                </div>
                <div className="form-group">
                    <button className="venyoo_btn venyoo_cta js-save-lead-and-close" type="submit">
                        Сохранить лид и закрыть
                    </button>
                </div>
            </form>
        )
    }
}
export default socketConnect(LeadForm);