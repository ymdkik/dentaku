import React, { useContext } from 'react';
import { textC } from './Calculation'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Display.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: "10px 100px",
            width: 300,
        },
    },
    text: {
        textAlign: "right",
    }
}));

function Display() {
    const text = useContext(textC)

    const classes = useStyles();

    return (
        <div className={classes.root} noValidate autoComplete="off">
            <TextField className={classes.text} label="電卓" id="outlined-size-normal" value={text[text.length-1]} variant="outlined"/>
        </div>
    )
}

export default Display