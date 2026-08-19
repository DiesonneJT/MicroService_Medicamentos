# MicroService_Medicamentos
Microservicio inventario farmacia

# Microservicio de Farmacia e Inventario de Medicamentos

Microservicio desarrollado como parte de la arquitectura de **HotelSync – Plataforma de Gestión Hotelera Multi-Propiedad**.

El servicio permite gestionar el inventario de medicamentos, controlar las cantidades disponibles, aumentar y disminuir existencias, detectar medicamentos con bajo stock y consultar medicamentos próximos a vencer.

---

## 1. Descripción

El **Microservicio de Farmacia** funciona como un servicio independiente dentro del ecosistema de HotelSync.

Su responsabilidad principal es administrar la información relacionada con los medicamentos y su inventario.

El servicio permite:

* Registrar medicamentos.
* Consultar medicamentos registrados.
* Aumentar la cantidad disponible de un medicamento.
* Disminuir la cantidad disponible.
* Evitar descuentos cuando no existe suficiente stock.
* Consultar medicamentos próximos a vencer.
* Consultar medicamentos cuyo stock se encuentra por debajo del mínimo establecido.

La arquitectura general sigue el enfoque de microservicios planteado para HotelSync, donde cada servicio mantiene responsabilidades específicas y puede disponer de su propia persistencia.

---

## 2. Tecnologías utilizadas

* Node.js
* NestJS
* TypeScript
* Prisma ORM
* SQLite
* API REST
* PowerShell para pruebas de los endpoints

---

## 3. Arquitectura

El microservicio se encuentra estructurado de la siguiente manera:

```text
HotelSync
    │
    ▼
API Gateway
    │
    ▼
Microservicio de Farmacia
    │
    ├── Controller
    │
    ├── Service
    │
    └── Prisma
          │
          ▼
       SQLite
```

### Componentes principales

**Controller**

Recibe las solicitudes HTTP y expone los endpoints REST del microservicio.

**Service**

Contiene las reglas de negocio relacionadas con el inventario de medicamentos.

**Prisma**

Se utiliza como ORM para realizar las operaciones sobre la base de datos.

**SQLite**

Almacena la información propia del microservicio.

---

## 4. Modelo de datos

Cada medicamento contiene información relacionada con su identificación, presentación, lote, vencimiento y existencia disponible.

### Medicamento

| Campo                | Descripción                   |
| -------------------- | ----------------------------- |
| `id`                 | Identificador único           |
| `nombreMedicamento`  | Nombre del medicamento        |
| `presentacion`       | Presentación del medicamento  |
| `lote`               | Número o código del lote      |
| `fechaVencimiento`   | Fecha de vencimiento          |
| `cantidadDisponible` | Cantidad actual disponible    |
| `umbralMinimo`       | Cantidad mínima permitida     |
| `creadoEn`           | Fecha de creación             |
| `actualizadoEn`      | Fecha de última actualización |

---

## 5. Instalación

### Requisitos

Tener instalado:

* Node.js
* npm

No es necesario instalar un servidor PostgreSQL para esta versión, ya que el proyecto utiliza SQLite.

---

### Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar en la carpeta:

```bash
cd microservicio-farmacia
```

---

### Instalar dependencias

En PowerShell, si la ejecución de `npm.ps1` está restringida, se puede utilizar:

```powershell
npm.cmd install
```

---

## 6. Configuración de la base de datos

El proyecto utiliza SQLite mediante Prisma.

La conexión se configura mediante la variable:

```env
DATABASE_URL="file:./dev.db"
```

La base de datos se genera como un archivo local de SQLite.

---

## 7. Migraciones

Para crear o actualizar la estructura de la base de datos:

```powershell
npx.cmd prisma migrate dev --name init
```

También se puede consultar la base de datos mediante Prisma Studio:

```powershell
npx.cmd prisma studio
```

---

## 8. Ejecutar el proyecto

Para iniciar el microservicio en modo desarrollo:

```powershell
npm.cmd run start:dev
```

El servicio queda disponible en:

```text
http://localhost:3001
```

La API utiliza el prefijo:

```text
/api
```

Por ejemplo:

```text
http://localhost:3001/api/medicamentos
```

---

# 9. Endpoints

## 9.1 Crear medicamento

### Método

```http
POST /api/medicamentos
```

### Ejemplo

```json
{
  "nombreMedicamento": "Paracetamol",
  "presentacion": "Tabletas 500 mg",
  "lote": "LOT-001",
  "fechaVencimiento": "2027-12-31T00:00:00.000Z",
  "cantidadDisponible": 100,
  "umbralMinimo": 20
}
```

---

## 9.2 Consultar medicamentos

### Método

```http
GET /api/medicamentos
```

### Ejemplo de respuesta

```json
[
  {
    "id": 1,
    "nombreMedicamento": "Paracetamol",
    "presentacion": "Tabletas 500 mg",
    "lote": "LOT-001",
    "fechaVencimiento": "2027-12-31T00:00:00.000Z",
    "cantidadDisponible": 120,
    "umbralMinimo": 20
  }
]
```

---

## 9.3 Aumentar stock

### Método

```http
PATCH /api/medicamentos/:id/aumentar
```

### Ejemplo

```http
PATCH /api/medicamentos/1/aumentar
```

### Body

```json
{
  "cantidad": 50
}
```

La cantidad disponible se incrementa según la cantidad indicada.

---

## 9.4 Disminuir stock

### Método

```http
PATCH /api/medicamentos/:id/disminuir
```

### Ejemplo

```http
PATCH /api/medicamentos/1/disminuir
```

### Body

```json
{
  "cantidad": 30
}
```

La cantidad disponible se reduce según la cantidad indicada.

---

## 9.5 Control de stock insuficiente

El servicio evita realizar una disminución cuando la cantidad solicitada es superior al stock disponible.

Por ejemplo, si existen:

```text
Stock disponible: 120
```

y se solicita:

```text
Cantidad a disminuir: 200
```

el servicio responde:

```json
{
  "message": "Stock insuficiente. Disponible: 120.",
  "error": "Conflict",
  "statusCode": 409
}
```

Esto evita que el inventario termine con cantidades negativas.

---

## 9.6 Medicamentos próximos a vencer

### Método

```http
GET /api/medicamentos/proximos-vencer
```

Este endpoint permite identificar medicamentos cuya fecha de vencimiento se encuentra próxima.

### Ejemplo probado

Se registró:

```text
Medicamento: Amoxicilina
Fecha de vencimiento: 2026-09-15
```

La consulta permitió identificar correctamente este medicamento.

---

## 9.7 Medicamentos con bajo stock

### Método

```http
GET /api/medicamentos/bajo-stock
```

Este endpoint identifica los medicamentos cuya cantidad disponible es igual o inferior al umbral mínimo establecido.

### Ejemplo probado

```text
Medicamento: Ibuprofeno
Cantidad disponible: 5
Umbral mínimo: 20
```

Como:

```text
5 <= 20
```

el medicamento es identificado como producto con bajo stock.

---

# 10. Pruebas realizadas

Durante las pruebas funcionales se verificaron los siguientes casos:

| Prueba                                | Resultado      |
| ------------------------------------- | -------------- |
| Crear medicamento                     | Correcto       |
| Consultar medicamentos                | Correcto       |
| Aumentar stock                        | Correcto       |
| Disminuir stock                       | Correcto       |
| Intentar disminuir stock insuficiente | `409 Conflict` |
| Consultar próximos a vencer           | Correcto       |
| Consultar medicamentos con bajo stock | Correcto       |

---

# 11. Ejemplos de datos utilizados

### Paracetamol

```text
ID: 1
Presentación: Tabletas 500 mg
Lote: LOT-001
Stock: 120
Stock mínimo: 20
Vencimiento: 2027-12-31
```

### Amoxicilina

```text
ID: 2
Presentación: Cápsulas 500 mg
Lote: LOT-002
Stock: 50
Stock mínimo: 10
Vencimiento: 2026-09-15
```

### Ibuprofeno

```text
ID: 3
Presentación: Tabletas 400 mg
Lote: LOT-003
Stock: 5
Stock mínimo: 20
Vencimiento: 2028-01-30
```

---

# 12. Estructura del proyecto

```text
microservicio-farmacia/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── medicamentos/
│   │   ├── dto/
│   │   ├── medicamentos.controller.ts
│   │   ├── medicamentos.service.ts
│   │   └── medicamentos.module.ts
│   │
│   ├── prisma/
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── docs/
│   └── arquitectura.md
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

---

# 13. Relación con HotelSync

El microservicio de farmacia se plantea como un servicio independiente dentro de la arquitectura general de HotelSync.

Su responsabilidad está limitada a la gestión del inventario de medicamentos, evitando mezclar esta lógica con otros servicios de la plataforma.

La comunicación futura con otros componentes de HotelSync puede realizarse mediante el API Gateway y mecanismos de comunicación entre microservicios.

La integración con otros servicios no forma parte de la implementación funcional de este microservicio.

---

# 14. Consideraciones

El microservicio está diseñado para funcionar de manera independiente y mantener su propia persistencia.

El control de stock evita descuentos superiores a la cantidad disponible.

Las consultas de próximos vencimientos y bajo stock permiten generar información útil para la gestión del inventario.

---

## 15. Autor

**Proyecto académico – Arquitectura de Software**

**Microservicio:** Farmacia / Inventario de Medicamentos

**Proyecto principal:** HotelSync – Plataforma de Gestión Hotelera Multi-Propiedad
