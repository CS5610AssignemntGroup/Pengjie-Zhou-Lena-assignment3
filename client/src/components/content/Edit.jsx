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
    const prompt = `Please input your New Long URL for ${params.shortUrl}`;
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
            console.log(config);
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
        console.log(response);
        if (response !== {}) {
            return <div>{response.data.message}</div>;
        }
    };

    return (
        <div>
            <InputLabel htmlFor="{'first-field'}">{prompt}</InputLabel>
            <InputField
                setField={setFirstField}
                isError={false}
                option={'New Long'}
            />
            <br />
            <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
            </Button>
            <Button variant="contained" color="primary" onClick={handleDelete}>
                Delete
            </Button>
            <br />
            {handleResponse()}
        </div>
    );
}
