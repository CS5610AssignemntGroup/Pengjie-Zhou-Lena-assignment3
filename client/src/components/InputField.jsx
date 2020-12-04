import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function InputField(props) {
    const classes = useStyles();
    const { setField, isError, option } = props;

    if (isError) {
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label={`${option} URL`}
                        helperText="Not a valid url"
                        variant="outlined"
                        style={{ width: '70%' }}
                        onChange={e => setField(e.target.value)}
                    />
                </div>
            </form>
        );
    } else {
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="filled-required"
                        label={`${option} URL`}
                        variant="filled"
                        style={{ width: '70%' }}
                        onChange={e => setField(e.target.value)}
                    />
                </div>
            </form>
        );
    }
}
