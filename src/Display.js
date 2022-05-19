import React, { useContext } from 'react';
import { textC, setTextC } from './Calculation'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: "10px 100px",
            width: 300,
        },
    }
}));

function Display() {
    const text = useContext(textC)

    const classes = useStyles();

    return (
        <div className={classes.root} noValidate autoComplete="off">
            <TextField label="電卓" id="outlined-size-normal" value={text[text.length-1]} variant="outlined"/>
        </div>
    )
}

export default Display