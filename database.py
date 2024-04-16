import csv
import sqlite3

def create_database_table():
    conn = sqlite3.connect('customer_data.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS customers (
                    customer_id INTEGER PRIMARY KEY,
                    first_name TEXT,
                    last_name TEXT,
                    company TEXT,
                    city TEXT,
                    country TEXT,
                    phone1 TEXT,
                    phone2 TEXT,
                    email TEXT,
                    subscription_date TEXT,
                    website TEXT,
                    sales_2021 REAL,
                    sales_2022 REAL
                )''')
    conn.commit()
    conn.close()

def import_data_from_csv(csv_file):
    conn = sqlite3.connect('customer_data.db')
    c = conn.cursor()

    with open(csv_file, 'r', newline='', encoding='utf-8') as file:
        csv_reader = csv.reader(file, delimiter=';')  # Setze den Trenner auf Semikolon
        # Überspringe die erste Zeile (Spaltennamen)
        next(csv_reader)
        for row in csv_reader:
            c.execute('''INSERT INTO customers (first_name, last_name, company, city, country, 
                                                phone1, phone2, email, subscription_date, website, 
                                                sales_2021, sales_2022)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                      (row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13]))

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_database_table()
    csv_file = 'customers_sales_2021_2022.csv'  # Dateiname der CSV-Datei anpassen
    import_data_from_csv(csv_file)