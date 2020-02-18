# roopairs!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    if "test" in sys.argv:
        import coverage
        # Clear existng coverage file
        cov = coverage.Coverage()
        cov.erase()
        # Start collecting coverage data
        os.environ["COVERAGE_PROCESS_START"] = "setup.cfg"
        coverage.process_startup()
        # Switch to the test settings file
        os.environ["DJANGO_SETTINGS_MODULE"] = "HomepairsApp.settings.test"
    else:
        os.environ['DJANGO_SETTINGS_MODULE'] = 'HomepairsApp.settings.base'

    main()
