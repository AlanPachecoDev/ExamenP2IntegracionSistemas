import os
import csv
import requests

# Definir la ruta del archivo CSV
carpeta_descargas = os.path.expanduser('~/Downloads')
archivo_csv = os.path.join(carpeta_descargas, 'OrdenesDeCompra.csv')

# Verificar si el archivo existe
if not os.path.exists(archivo_csv):
    print(f"El archivo {archivo_csv} no existe.")
    exit()

# Leer el archivo CSV
ordenes_compra = []
with open(archivo_csv, mode='r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        ordenes_compra.append(row)

# Enviar solicitudes para actualizar el stock
all_requests_successful = True

for orden in ordenes_compra:
    id_producto = orden['IDProducto']
    cantidad = int(orden['Cantidad'])

    url = f'http://localhost:3001/api/inventarios/productos/{id_producto}/stock'
    data = {'cantidad': cantidad}

    response = requests.put(url, json=data)

    if response.status_code == 200:
        print(f"Stock del producto {id_producto} actualizado correctamente.")
    else:
        print(f"Error al actualizar el stock del producto {id_producto}: {response.text}")
        all_requests_successful = False

# Eliminar el archivo CSV si todas las solicitudes fueron exitosas
if all_requests_successful:
    try:
        os.remove(archivo_csv)
        print(f"El archivo {archivo_csv} ha sido eliminado.")
    except Exception as e:
        print(f"Error al eliminar el archivo {archivo_csv}: {e}")
else:
    print(f"El archivo {archivo_csv} no se eliminará debido a errores en la actualización del stock.")
