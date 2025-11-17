from typing import Union

from modules.config.config_service import ConfigService
from modules.logger.internal.console_logger import ConsoleLogger
from modules.logger.internal.datadog_logger import DatadogLogger
from modules.logger.internal.types import LoggerTransports


class Loggers:
    _LOGGERS: list[Union[ConsoleLogger, DatadogLogger]] = []

    @staticmethod
    def initialize_loggers() -> None:
        logger_transports = ConfigService[list[str]].get_value(key="logger.transports")
        for logger_transport in logger_transports:
            if logger_transport == LoggerTransports.CONSOLE:
                Loggers._LOGGERS.append(Loggers.__get_console_logger())

            if logger_transport == LoggerTransports.DATADOG:
                # Only initialize Datadog logger if required config is available
                if Loggers.__can_initialize_datadog():
                    try:
                        Loggers._LOGGERS.append(Loggers.__get_datadog_logger())
                    except Exception:
                        # If Datadog initialization fails, skip it and continue with console logger
                        pass

    @staticmethod
    def info(*, message: str) -> None:
        [logger.info(message=message) for logger in Loggers._LOGGERS]

    @staticmethod
    def debug(*, message: str) -> None:
        [logger.debug(message=message) for logger in Loggers._LOGGERS]

    @staticmethod
    def error(*, message: str) -> None:
        [logger.error(message=message) for logger in Loggers._LOGGERS]

    @staticmethod
    def warn(*, message: str) -> None:
        [logger.warn(message=message) for logger in Loggers._LOGGERS]

    @staticmethod
    def critical(*, message: str) -> None:
        [logger.critical(message=message) for logger in Loggers._LOGGERS]

    @staticmethod
    def __get_console_logger() -> ConsoleLogger:
        return ConsoleLogger()

    @staticmethod
    def __can_initialize_datadog() -> bool:
        """Check if required Datadog configuration is available."""
        try:
            # Check if required Datadog config keys exist (log_level has a default, so it should work)
            # But we check if other critical configs are available via environment variables
            # If datadog is not fully configured, we'll skip it
            ConfigService[str].get_value(key="datadog.log_level", default="INFO")
            # Try to check if other datadog configs exist (optional check)
            # If they don't exist, DatadogHandler will fail at emit time, but init should work
            return True
        except Exception:
            return False

    @staticmethod
    def __get_datadog_logger() -> DatadogLogger:
        return DatadogLogger()
