import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useMutation, QueryClient } from 'react-query';
// import account from './account.json';
// import techs from './techs.json';
import TableChooseStrategy from '../Table/TableChooseStrategy';
import { dataPut } from '../api/dataFetch';

class Settings {

    constructor(account, techs) {
        this._account = account;
        this._strategies = techs;
    }

    mixAccountTechs(account, techs) {
        const result = [];
        const { strategy } = account.data.attributes;
        techs.data.map((tech) => {
            tech.attributes.technique_details.map((detail) => {
                result.push({...detail, checked: _.includes(strategy, detail.strategy) });
            });
        });
        return result;
    }
    
    getColumns() {
        const columns = [
            { key: 'checked', name: ' - ' },
            { key: 'title', name: 'Name' },
            { key: 'summary', name: 'News' },
            { key: 'video', name: 'video' }
            ];
        return columns;
    }

    getRows() {
        const rows = this.mixAccountTechs(this._account, this._strategies);
        return rows;
    }

}

function SettingsForm ({jwt, putUrl, account, subscriptions}) {
    const [ discordId, setDiscordId ] = useState('');
    const [ columns, setColumns ] = useState([]);
    const [ strategies, setStrategies ] = useState([]);
    const queryClient = new QueryClient();

    useEffect (() => {
        const settings = new Settings(account, subscriptions);
        setColumns(settings.getColumns());
        setStrategies(settings.getRows());
        setDiscordId(account.data.attributes.discordId);
    }, []);

    const onDiscordIdChange = (e) => {
        setDiscordId(e.target.value);
        _.debounce(async () => {
            await dataPut(putUrl, jwt, { discordId: e.target.value });
          }, 500)();
    };

    const { mutate } = useMutation((account) => dataPut(putUrl, jwt, account), {
        onSuccess: () => {
          queryClient.invalidateQueries('account');
        },
        onError: (error) => {
          console.log(error);
        }
      });
        
    const onStrategyChange = (e) => {
        const { id, checked } = e.target;
        setStrategies((prev) => {
            const data = prev.map((tech) => {
                if (tech.strategy === id) {
                    return {...tech, checked }
                }
                return tech;
            });
            _.debounce(async () => {
                const strategy = data.filter((tech) => tech.checked).map((tech) => tech.strategy);
                mutate({ strategy });
                // await dataPut(putUrl, jwt, { strategy });
              }, 500)();
            return data;
        })
    };

    return (
        <div className="contact-form" data-aos="fade-up" data-aos-delay="300">
            <div className="row mb-n6">
                <div className="col-md-6 col-12 mb-6">
                    <input 
                        type="text" 
                        placeholder="Discord ID" 
                        name="discordId"
                        value={discordId}
                        onChange={onDiscordIdChange}
                    />
                </div>
                <div className="col-md-6 col-12 mb-6">
                    <p>&nbsp;</p>
                </div>
                <div className="col-md-12 col-12 mb-6">
                    <TableChooseStrategy columns={columns} rows={strategies} onCheckboxChange={onStrategyChange} />
                </div>
            </div>
        </div>
    )
}

SettingsForm.propTypes = {
    jwt: PropTypes.string.isRequired,
    putUrl: PropTypes.string.isRequired,
    account: PropTypes.object.isRequired,
    subscriptions: PropTypes.object.isRequired
};

export default SettingsForm;
