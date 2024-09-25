-- Usar la base de datos BDDSistemaInventarios
USE BDDSistemaInventarios;

-- Insertar 10 productos (Pokémons) en la tabla productos con el atributo 'stock'
INSERT INTO productos (Nombre, Descripcion, Precio, Stock) VALUES 
('Pikachu', 'Un Pokémon de tipo Eléctrico. Conocido por sus habilidades eléctricas.', 150.00, FLOOR(RAND() * 900) + 100),
('Charmander', 'Un Pokémon de tipo Fuego. Famoso por la llama en su cola.', 200.00, FLOOR(RAND() * 900) + 100),
('Bulbasaur', 'Un Pokémon de tipo Planta/Veneno. Tiene una planta en su espalda.', 180.00, FLOOR(RAND() * 900) + 100),
('Squirtle', 'Un Pokémon de tipo Agua. Conocido por su caparazón y habilidades acuáticas.', 170.00, FLOOR(RAND() * 900) + 100),
('Jigglypuff', 'Un Pokémon de tipo Normal/Hada. Famoso por sus habilidades de canto.', 140.00, FLOOR(RAND() * 900) + 100),
('Meowth', 'Un Pokémon de tipo Normal. Conocido por su habilidad para encontrar dinero.', 160.00, FLOOR(RAND() * 900) + 100),
('Psyduck', 'Un Pokémon de tipo Agua. Famoso por sus dolores de cabeza y habilidades psíquicas.', 130.00, FLOOR(RAND() * 900) + 100),
('Snorlax', 'Un Pokémon de tipo Normal. Conocido por su tamaño y su amor por dormir.', 300.00, FLOOR(RAND() * 900) + 100),
('Eevee', 'Un Pokémon de tipo Normal. Famoso por sus múltiples evoluciones.', 220.00, FLOOR(RAND() * 900) + 100),
('Mewtwo', 'Un Pokémon de tipo Psíquico. Conocido por su gran poder y habilidades psíquicas.', 500.00, FLOOR(RAND() * 900) + 100);
