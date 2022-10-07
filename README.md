# Api simple de bienvenidas para replit (Funcional con canvas)
> Usa [**niby-welcomes**](https://www.npmjs.com/package/niby-welcomes)

Hola, para la mayoría es un hecho de que trabajar con canvas puede ser estresante e incluso en algunos casos imposible técnicamente.

Por ello, he decidido hacer publico esta "API" si se pudiera decir así, para crear tarjetas de bienvenidas con el modulo [niby-welcomes](https://www.npmjs.com/package/niby-welcomes), este mismo nos da la posibilidad de crear tarjetas de bienvenida muy lindas al estilo del amadisimo Koya.

## ¿Por que usar esto?
Bueno, cuando yo quise usar canvas en Android no podia, debido a que este sistema operativo no era compatible con canvas, y si, niby-welcomes también depende de canvas.

Por lo que una buena opción era crear una API en un host externo (como replit) y usar esta misma para recibir un buffer de la imagen y ya solo tendria que codificarla con algún constructor.

Obviamente no todo fue color de rosa, tarde un poco en comprender como funcionaban los Buffer y hacer un constructor para JavaScript y así poder usar la API aún más fácilmente.
