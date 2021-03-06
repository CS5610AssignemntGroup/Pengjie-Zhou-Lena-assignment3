import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import InputField from '../InputField';
import validUrl from 'valid-url';

export default function Branded(props) {
    let history = useHistory();
    const [firstField, setFirstField] = React.useState('');
    const [firstError, setFirstError] = React.useState(false);
    const [secondField, setSecondField] = React.useState('');
    const [response, setResponse] = React.useState({ data: '' });

    const handleSubmit = async () => {
        const hasError = validUrl.isUri(firstField) === undefined;
        setFirstError(prevState => hasError);
        if (firstField === '' || secondField === '') {
            alert('Please input URL');
        }
        if (hasError) {
            alert('Not a valid URL');
        } else {
            const postUrl = process.env.REACT_APP_BASE_URL + '/url/branded';
            const data = {
                longUrl: firstField,
                shortUrl: secondField,
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

    const handleEdit = async () => {
        if (secondField === '') {
            alert('Please input Short URL you want to edit');
        }

        history.push(`/url/${secondField}/edit`);
    };

    const handleResponse = () => {
        if (response.data !== '') {
            return (
                <div>
                    <div>{response.data.message} </div>
                    <div>{response.data.fullShortUrl || ''}</div>
                </div>
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
            <br />
            <InputLabel htmlFor="{'second-field'}">
                Please input your customized short URL id
            </InputLabel>
            <InputField
                id={'second-field'}
                setField={setSecondField}
                isError={false}
                option={isLong(false)}
            />
            <br />
            <div className="buttons">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}>
                    Create
                </Button>{' '}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}>
                    Edit/Delete
                </Button>
            </div>
            <br />
            <div className="url-msg-div">
                <h2>{handleResponse()} </h2>
            </div>
        </div>
    );
}
