# Tests

This project currently has no application code. This directory contains a basic pytest harness so you can run tests as code is added.

Run locally:
1. Create a virtual environment (recommended)
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
2. Install dev requirements
   pip install -r requirements-dev.txt
3. Run tests
   pytest --maxfail=1 --disable-warnings -q

Coverage:
- pytest-cov is configured in pytest.ini. Once application code exists, coverage will be reported.

Adding tests:
- Create new files under tests/ with the prefix test_*.py.
- Follow Arrange/Act/Assert pattern and keep tests independent.

Notes:
- When a specific tech stack emerges (e.g., FastAPI, Django, Flask, Node/React), extend or migrate the setup accordingly (e.g., httpx for FastAPI, Django test runner, Jest for Node, etc.).
