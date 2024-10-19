from telethon.sync import TelegramClient
from telethon import functions

with TelegramClient(name, api_id, api_hash) as client:
    result = client(functions.messages.CreateChatRequest(
        users=['username'],
        title='My awesome title',
        ttl_period=42
    ))
    print(result.stringify())

