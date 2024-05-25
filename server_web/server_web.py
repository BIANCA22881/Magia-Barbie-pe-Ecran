import socket
import os # pentru dimensiunea fisierului
import gzip
import io
import threading
import json

def write_json(new_data):
    with open('C:\\Users\\bianc\\proiect-1-BIANCA22881\\proiect-1-BIANCA22881\\continut\\resurse\\utilizatori.json','r+') as file:
          # First we load existing data into a dict.
        file_data = json.load(file)
        # Join new_data with file_data inside emp_details
        json_data=json.loads(new_data)
        file_data["utilizatori"].append(json_data)
        # Sets file's current position at offset.
        file.seek(0)
        # convert back to json.
        json.dump(file_data, file, indent = 4)
		#json.dump(file_data, file, indent = 4)

 
def connClient(clientsocket):
	print ('S-a conectat un client.')
	# se proceseaza cererea si se citeste prima linie de text
	cerere = ''
	linieDeStart = ''
	while True:
		buf = clientsocket.recv(1024)
		if len(buf) < 1:
			break
		cerere = cerere + buf.decode()
		print ('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
		pozitie = cerere.find('\r\n')
		if (pozitie > -1 and linieDeStart == ''):
			linieDeStart = cerere[0:pozitie]
			print ('S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####')
			break
	print ('S-a terminat cititrea.')
	if linieDeStart == '':
		clientsocket.close()
		print ('S-a terminat comunicarea cu clientul - nu s-a primit niciun mesaj.')
		return
	# interpretarea sirului de caractere `linieDeStart`
	elementeLineDeStart = linieDeStart.split()
	# TODO securizare
	numeResursaCeruta = elementeLineDeStart[1]
	if numeResursaCeruta == '/':
		numeResursaCeruta = '/index.html'
	############################3
	print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
	print(numeResursaCeruta)
	print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
		
	if numeResursaCeruta == '/api/utilizatori':
    	# python object to be appended
		#htmlFile=urllib2.url
		jsonPozS = cerere.find('{')
		jsonPozF = cerere.find('}')
		y = cerere[jsonPozS:jsonPozF+1]
		print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
		print(y)
		print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
		write_json(y) 
	else:
	############################3
	# calea este relativa la directorul de unde a fost executat scriptul
		numeFisier = '.\\continut\\' + numeResursaCeruta
		#\continut\index.html"
		fisier = None
		try:
			# deschide fisierul pentru citire in mod binar
			fisier = open(numeFisier,'rb')
			fisierdat=gzip.compress(fisier.read())
			
			#cvfisier = gzip.compress(fisier.read())
			# tip media
			numeExtensie = numeFisier[numeFisier.rfind('.')+1:]
			tipuriMedia = {
				'html': 'text/html; charset=utf-8',
				'css': 'text/css; charset=utf-',
				'js': 'text/javascript; charset=utf-8',
				'png': 'image/png',
				'jpg': 'image/jpeg',
				'jpeg': 'image/jpeg',
				'gif': 'image/gif',
				'ico': 'image/x-icon',
				'xml': 'application/xml; charset=utf-8',
				'json': 'application/json; charset=utf-8'
			}
			tipMedia = tipuriMedia.get(numeExtensie,'text/plain; charset=utf-8')
			
			# se trimite raspunsul
			clientsocket.sendall('HTTP/1.1 200 OK\r\n'.encode())
			#stri='Content-Length: ' + str(os.stat(numeFisier).st_size) + '\r\n'
			stri='Content-Length: ' + str(len(fisierdat)) + '\r\n'
			clientsocket.sendall(stri.encode())
			stri = 'Content-Type: ' + tipMedia +'\r\n'
			clientsocket.sendall(stri.encode())
			clientsocket.sendall('Content-Encoding: gzip\r\n'.encode())
			clientsocket.sendall('Server: My PW Server\r\n'.encode())
			clientsocket.sendall('\r\n'.encode())
			clientsocket.sendall(fisierdat)
			# citeste din fisier si trimite la server
			#out = io.BytesIO(gzip.compress(fisier.read()))
			#buf = out.read(1024)
			#while (buf):
			#	clientsocket.send(buf)
			#	buf = out.read(1024)
			# buf = fisier.read(1024)
			# while (buf):
			# 	clientsocket.send(buf)
			# 	buf = fisier.read(1024)
		except IOError:
			# daca fisierul nu exista trebuie trimis un mesaj de 404 Not Found
			msg = 'Eroare! Resursa ceruta ' + numeResursaCeruta + ' nu a putut fi gasita!'
			print (msg)
			clientsocket.sendall('HTTP/1.1 404 Not Found\r\n'.encode())
			stri='Content-Length: ' + str(len(msg.encode('utf-8'))) + '\r\n'
			clientsocket.sendall(stri.encode())
			clientsocket.sendall('Content-Type: text/plain; charset=utf-8\r\n'.encode())
			clientsocket.sendall('Server: My PW Server\r\n'.encode())
			clientsocket.sendall('\r\n'.encode())
			clientsocket.sendall(msg.encode())

		finally:
			if fisier is not None:
				fisier.close()
		clientsocket.close()
		print ('S-a terminat comunicarea cu clientul.')
		

#

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)
while True:
	print ('#########################################################################')
	print ('Serverul asculta potentiali clienti.')
	# asteapta conectarea unui client la server
	# metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
	(clientsocket, address) = serversocket.accept()
	newThread = threading.Thread(target = connClient,args = (clientsocket,))
	newThread.start()

