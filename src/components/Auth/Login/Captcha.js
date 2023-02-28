import ReactRecaptcha3 from 'react-google-recaptcha3';
import React, { useEffect, useState } from 'react';

function Captcha() {
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    useEffect(() => {
        ReactRecaptcha3.init('6LedAJEUAAAAAPttxeFNp6ZtAvKGI8D9gESE-hl3').then((status) => {
            console.log(status);
        });
    }, []);

    const submit = () => {
        ReactRecaptcha3.getToken().then(
            (resp) => {
                console.log(resp);
                setToken(resp);
            },
            (error) => {
                console.log(error);
            }
        );
    };
    return (
        <div className="App">
            <div>
                <p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <button onClick={submit}>Submit</button>
                </p>
                <div>
                    <p>
                        Token is <b>{token}</b>
                    </p>
                    <p>name: {name}</p>
                </div>
            </div>
        </div>
    );
}

export default Captcha;
