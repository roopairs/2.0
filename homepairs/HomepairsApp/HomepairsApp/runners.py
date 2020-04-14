import subprocess

from coverage import Coverage
from coverage.control import process_startup
from django.test.runner import default_test_processes
from xmlrunner.extra.djangotestrunner import XMLTestRunner


class CoverageLintingXMLTestRunner(XMLTestRunner):
    """A runner that runs coverage, linting, and exports XML xunit artifacts.

    Note: If you have fewer TestCases than processes, you will see the following warning in your test output:
    `Coverage.py warning: No data was collected. (no-data-collected)` for each process that didn't have a TestCase
    to run.
    """

    def __init__(self, parallel=1, reset_db=False, **kwargs):
        if reset_db:
            kwargs.update({"keepdb": False, "interactive": False})
        else:
            kwargs.update({"keepdb": True})

        kwargs.update({"parallel": default_test_processes() if parallel != 0 else 0})
        super().__init__(**kwargs)

    @classmethod
    def add_arguments(cls, parser):
        super().add_arguments(parser)
        parser.add_argument(
            '--reset-db', action='store_true',
            help='Resets clone databases so that migrations can be applied.',
        )

    def run_tests(self, *args, **kwargs):
        suite_result = super().run_tests(*args, **kwargs)

        cov = getattr(process_startup, "coverage")
        cov.stop()
        cov.save()

        print()
        print("Generating Coverage Report...")

        combined_cov = Coverage()
        combined_cov.load()
        combined_cov.combine()
        combined_cov.report()
        combined_cov.html_report()

        print()
        print("Linting files...")
        subprocess.call(["flake8"])

        return suite_result
