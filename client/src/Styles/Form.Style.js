import styled from 'styled-components';
export const FormContainer = styled.div`
    padding: 20px;
    h1 {
        border-bottom: 1px solid white;
        color: #3d3d3d;
        font-family: sans-serif;
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        padding: 10px;
        text-align: center;
    }
    form {
        background: white;
        border: 1px solid #dedede;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 0 auto;
        max-width: 500px;
        padding: 30px 50px;
    }
    input {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
    }
    label {
        color: #3d3d3d;
        display: block;
        font-family: sans-serif;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 5px;
    }
    
    .submit {
        font-family: sans-serif;
        font-size: 14px;
        margin: 20px 0px;
    }
`;