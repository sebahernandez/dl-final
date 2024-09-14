INSERT INTO
    users (
        name,
        email,
        password,
        registerdate
    )
VALUES
    (
        'admin@gmail.com',
        'admin123',
    );

INSERT INTO
    categories (name)
VALUES
    ('fakename');

INSERT INTO
    products (
        name,
        description,
        price,
        stock,
        creationdate,
        image,
        categoryid,
        gender
    )
VALUES
    (
        "Faketillas",
        "fakedescription",
        500,
        5,
        10 -05 -2024,
        "fakeurl",
        1,
        "fake"
    );