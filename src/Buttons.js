import React, { useContext } from 'react';
import { textC, setTextC } from './Calculation'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "5px 100px",
    },
    box: {
        '& > *': {
            margin: "5px",
        },
    },
    button: {
        backgroundColor: '#bdbdbd',
        borderColor: '#bdbdbd'
    },
    equal: {
        color: '#ffffff',
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
    },
    number: {
        backgroundColor: '#e6e6e6',
        borderColor: '#e6e6e6',
    },
}));

function Buttons() {
    const text = useContext(textC)
    const setText = useContext(setTextC)

    const clickb = (s) => {
        setText(prev => {
            if(prev[prev.length-1].slice(-1)[0] !== ")"){
                return [...prev, prev[prev.length-1] + s]
            } else {
                return prev
            }
        });
    }

    const clickc = () => {
        setText(prev => {
            if(prev.length !== 1){
                return prev.slice(0, prev.length-1)
            } else {
                return [""]
            }
        });
    }

    const clickk = (s) => {
        setText(prev => {
            if(prev[prev.length-1].slice(-1)[0] === "%" || 
               prev[prev.length-1].slice(-1)[0] === "÷" ||
               prev[prev.length-1].slice(-1)[0] === "×" ||
               prev[prev.length-1].slice(-1)[0] === "-" ||
               prev[prev.length-1].slice(-1)[0] === "+"){
                return [...prev.slice(0, prev.length-1), prev[prev.length-1].slice(0, prev.length-2) + s]
            } if(prev[prev.length-1].slice(-1)[0] === "("){
                return prev
            }else {
                return [...prev, prev[prev.length-1] + s]
            }
        });
    }

    const clickt = (s) => {
        setText(prev => [...prev, prev[prev.length-1] + s])
    }

    function Keisan(str) {
        const siki = []
        for (let i = 0; i < str.length; i++){
            if(str[i] !== "(") {
                siki.push(str[i])
            } else {
                const j = i
                let d = 1
                while(i + 1 < str.length && d !== 0){
                    if(str[i+1] === ")"){
                        d--
                    } else if(str[i+1] === "("){
                        d++
                    }
                    i++
                }
                siki.push(Keisan(str.slice(j + 1, i)))
            }
        }
        
        let siki2 = []
        for (let i = 0; i < siki.length; i++){
            let n = parseFloat(siki[i])
            while(i + 1 < str.length && !isNaN(siki[i + 1])){
                n = n * 10 + parseFloat(siki[i + 1])
                i++
            }
            siki2.push(n)
            if(i !== str.length-1) {
                siki2.push(siki[i + 1])
                i++
            }
        }

        let i = 1;
        while (i < siki2.length){
            if(siki2[i] === "%") {
                siki2[i-1] %= siki2[i+1]
                siki2.splice(i, 2)
            } else if(siki2[i] === "÷") {
                siki2[i-1] /= siki2[i+1]
                siki2.splice(i, 2)
            } else if(siki2[i] === "×") {
                siki2[i-1] *= siki2[i+1]
                siki2.splice(i, 2)
            } else {
                i += 2
            }
        }

        i = 1;
        while (i < str.length){
            if(siki2[i] === "+") {
                siki2[i-1] += siki2[i+1]
                siki2.splice(i, 2)
            } else if(siki2[i] === "-") {
                siki2[i-1] -= siki2[i+1]
                siki2.splice(i, 2)
            } else {
                i += 2
            }
        }

        return siki2[0].toString()
    }

    const clicke = () => {
        setText(prev => [Keisan(prev.slice(-1)[0]).toString()]);
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <Button className={classes.button} variant="outlined" size="large" onClick={() => clickt("(")}>(</Button>
                <Button className={classes.button} variant="outlined" size="large" onClick={() => clickt(")")}>)</Button>
                <Button className={classes.button} variant="outlined" size="large" onClick={() => clickk("%")}>%</Button>
                <Button className={classes.button} variant="outlined" size="large" onClick={() => clickc()}>C</Button>
            </div>
            <div className={classes.box}>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb("7")}>7</Button>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb("8")}>8</Button>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb("9")}>9</Button>
                <Button className={classes.button} variant="outlined" size="large" onClick={() => clickk("÷")}>÷</Button>
            </div>
            <div className={classes.box}>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb("4")}>4</Button>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb("5")}>5</Button>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb("6")}>6</Button>
                <Button className={classes.button} variant="outlined" size="large" onClick={() => clickk("×")}>×</Button>
            </div>
            <div className={classes.box}>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb("1")}>1</Button>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb("2")}>2</Button>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb("3")}>3</Button>
                <Button className={classes.button} variant="outlined" size="large" onClick={() => clickk("-")}>-</Button>
            </div>
            <div className={classes.box}>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb("0")}>0</Button>
                <Button className={classes.number} variant="outlined" size="large" onClick={() => clickb(".")}>.</Button>
                <Button className={classes.equal} variant="outlined" size="large" onClick={() => clicke("=")}>=</Button>
                <Button className={classes.button} variant="outlined" size="large" onClick={() => clickk("+")}>+</Button>
            </div>
        </div>
    );
}

export default Buttons;