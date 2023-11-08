import { useRef, useState, useEffect } from "react";
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/*
username must start with a letter and be between 4-24 chars long
username can contain hyphens, underscores, and numbers
*/
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;

/*
the password must meet the following requirements:
- contain at least one uppercase letter
- contain at least one digit
- contain one special character that is !, @, #, $, or %
- have a total length between 8 and 24 chars
*/
const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const usernameRef = useRef();
    const errorMessageRef = useRef();

    const [username, setUsername] = useState("");
    const [isValidName, setIsValidName] = useState(false);
    const [isUserFocus, setIsUserFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [isValidPasswordMatch, setIsValidPasswordMatch] = useState(false);
    const [isPasswordMatchFocus, setIsPasswordMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    // focus on user input as soon as the component loads
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    // everytime the username changes, run the regex to check if it is valid
    useEffect(() => {
        const result = USER_REGEX.test(username);
        console.log(result);
        console.log(username);
        setIsValidName(result);
    }, [username]);

    // everytime the password or match password changes, run the regex to see if they match or if the password is still valid
    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setIsValidPassword(result);

        const match = password === matchPassword;
        setIsValidPasswordMatch(match);
    }, [password, matchPassword]);

    // everytime an input field is changed, then user has read error message and the error message disappears
    useEffect(() => {
        setErrorMessage("");
    }, [username, password, matchPassword]);

    return (
        <section>
            <p
                ref={errorMessageRef}
                className={errorMessage ? "error-message" : "offscreen"}
            >
                {errorMessage}
            </p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:
                    <span className={isValidName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                        className={
                            isValidName || !username ? "hide" : "invalid"
                        }
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={usernameRef}
                    autoComplete="off"
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    onFocus={() => setIsUserFocus(true)}
                    onBlur={() => setIsUserFocus(false)}
                />
            </form>
            <p
                id="uidnote"
                className={
                    isUserFocus && username && !isValidName
                        ? "instructions"
                        : "offscreen"
                }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed.
            </p>
        </section>
    );
};

export default Register;
