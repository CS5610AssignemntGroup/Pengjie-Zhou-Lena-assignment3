import React from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InputField from '../InputField';
import validUrl from 'valid-url';

export default function Edit() {
    let params = useParams();
    const [firstField, setFirstField] = React.useState('');
    const [firstError, setFirstError] = React.useState(false);
    const pagePrompt = `In this page, you can edit long URL for your short URL id: ${params.shortUrl},
                        or delete it`;
    const inputPrompt = `Please input your New Long URL for short URL id :${params.shortUrl}`;
    const [response, setResponse] = React.useState({ data: '' });

    const handleEdit = async () => {
        setFirstError(!validUrl.isUri(firstField));
        if (!firstError) {
            const putUrl =
                process.env.REACT_APP_BASE_URL +
                '/url/' +
                params.shortUrl +
                '/edit';
            const data = {
                longUrl: firstField,
                shortUrl: params.shortUrl,
            };
            const config = {
                url: putUrl,
                method: 'put',
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

    const handleDelete = async () => {
        const deleteUrl =
            process.env.REACT_APP_BASE_URL + '/url/' + params.shortUrl;
        const config = {
            url: deleteUrl,
            method: 'delete',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        };

        const res = await axios(config);
        setResponse(res);
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

    return (
        <div>
            <p>{pagePrompt}</p>
            <InputLabel htmlFor="{'first-field'}">{inputPrompt}</InputLabel>
            <InputField
                setField={setFirstField}
                isError={false}
                option={'New Long'}
            />
            <br />
            <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
            </Button>{' '}
            <Button variant="contained" color="primary" onClick={handleDelete}>
                Delete
            </Button>
            <br />
            <div className="url-msg-div">
                <h2>{handleResponse()} </h2>
            </div>
        </div>
    );
}
