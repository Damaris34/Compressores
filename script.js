body {
    font-family: Arial, sans-serif;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    background-color: #ffffff;
    padding: 30px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 800px;
    box-sizing: border-box;
}

header {
    text-align: center;
    margin-bottom: 20px;
}

header h1 {
    font-size: 28px;
    color: #007BFF;
}

.info p {
    font-size: 16px;
    color: #555;
    text-align: center;
    margin-bottom: 20px;
}

.section {
    margin-top: 30px;
}

.subsection {
    margin-top: 20px;
}

.section h2, .subsection h3 {
    color: #007BFF;
    font-size: 22px;
    margin-bottom: 15px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    font-size: 16px;
}

table th {
    background-color: #f2f2f2;
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
}

table td {
    padding: 10px;
    border: 1px solid #ccc;
}

input[type="text"], select {
    width: calc(100% - 20px);
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
}

#photo-uploads {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

#photo-previews {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
}

#photo-previews img {
    max-width: 45%;
    border: 1px solid #ccc;
}

footer {
    text-align: center;
    margin-top: 30px;
}

button {
    padding: 12px 24px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #005bb5;
}
