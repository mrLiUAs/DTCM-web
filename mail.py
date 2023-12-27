import os
import requests
from dotenv import load_dotenv

load_dotenv()

def send_mail(email: str, med: str, doc: str):
    r = requests.post(
		"https://api.mailgun.net/v3/sandbox5da86d59c53840688eeaaffef4e69bed.mailgun.org/messages",
		auth=("api", os.getenv("MAILGUN_API")),
		data={"from": "mailgun@sandbox5da86d59c53840688eeaaffef4e69bed.mailgun.org",
			"to": [email],
			"subject": f"DTCM 處方 - {doc}醫師",
			"text": f"""
以下為您的處方：
{med}
開立者：{doc}醫師
本信由系統自動發送，請勿回覆。
"""},
			timeout=5
        )
    return r