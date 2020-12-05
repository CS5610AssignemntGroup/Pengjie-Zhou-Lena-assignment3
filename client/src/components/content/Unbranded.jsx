import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import InputField from '../InputField';
import validUrl from 'valid-url';
import './content.css';

export default function UnBranded(props) {
    let history = useHistory();
    const [firstField, setFirstField] = React.useState('');
    const [firstError, setFirstError] = React.useState(false);
    const [response, setResponse] = React.useState({ data: '' });

    const handleSubmit = async () => {
        setFirstError(!validUrl.isUri(firstField));
        if (firstField === '') {
            alert('Please input URL');
        } else if (!firstError) {
            const postUrl = process.env.REACT_APP_BASE_URL + '/url/unbranded';
            const data = {
                longUrl: firstField,
            };
            const config = {
                url: postUrl,
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                data: data,
            };

            const res = await axios(config);
            setResponse(res);
        }
    };

    const handleResponse = () => {
        if (response.data !== '') {
            return (
                <div>{response.data.message + response.data.fullShortUrl} </div>
            );
        }
    };

    const isLong = option => {
        return option ? 'Long' : 'Short';
    };

    return (
        <div>
            <InputLabel htmlFor="{'first-field'}">
                Please input your Long URL
            </InputLabel>
            <InputField
                id={'first-field'}
                setField={setFirstField}
                isError={firstError}
                option={isLong(true)}
            />

            <div className="buttons">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}>
                    Create
                </Button>
            </div>
            <br />
            <div className="url-msg-div">
                <h2>{handleResponse()} </h2>      
            </div>
        </div>
    );
}
