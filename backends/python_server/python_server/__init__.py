import os
import signal
import psutil
from fastapi import FastAPI, Request
from threading import Thread
import uvicorn

app = FastAPI()


def monitor_parent():
    """Monitor the parent process and exit if it terminates."""
    parent_pid = os.getppid()  # Get parent process ID
    try:
        parent = psutil.Process(parent_pid)
        while parent.is_running():
            pass
    except psutil.NoSuchProcess:
        pass
    print("Parent process terminated. Exiting sidecar.")
    os.kill(os.getpid(), signal.SIGTERM)


@app.post("/process")
async def process(request: Request):
    try:
        data = await request.json()
        name = data.get("name", "World")
        response = {"message": f"Hello, {name}!"}
    except Exception as e:
        response = {"error": str(e)}
    return response


if __name__ == "__main__":
    # Start the parent monitoring in a separate thread
    monitor_thread = Thread(target=monitor_parent, daemon=True)
    monitor_thread.start()

    # Start the FastAPI server
    uvicorn.run(app, host="127.0.0.1", port=5000)
