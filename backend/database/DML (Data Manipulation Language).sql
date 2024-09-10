INSERT INTO
    users (
        email,
        password,
        direction,
        phone,
        role,
        registerdate
    )
VALUES
    (
        'admin@gmail.com',
        'admin123',
        'Calle Falsa 123',
        555123456,
        'admin',
        '2024-09-04'
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