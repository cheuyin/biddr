import { useForm } from "react-hook-form";

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="Username"
                    {...register("username", {
                        required: "A username is required.",
                        minLength: {
                            value: 5,
                            message: "Min length is 5",
                        },
                    })}
                />
                <p>{errors.username?.message}</p>

                <input
                    placeholder="Email"
                    {...register("email", {
                        required: "An email is required.",
                    })}
                />
                <p>{errors.email?.message}</p>

                <input
                    placeholder="Full Name"
                    {...register("fullName", {
                        required: "Please enter your full name.",
                    })}
                />
                <p>{errors.fullName?.message}</p>

                <input type="submit" />
            </form>
        </div>
    );
};

export default SignUpForm;
