from modules.comment.comment_service import CommentService
from modules.comment.errors import CommentNotFoundError
from modules.comment.types import (
    CreateCommentParams,
    DeleteCommentParams,
    GetCommentParams,
    GetPaginatedCommentsParams,
    UpdateCommentParams,
)
from modules.task.task_service import TaskService
from modules.task.types import CreateTaskParams
from tests.modules.comment.base_test_comment import BaseTestComment


class TestCommentService(BaseTestComment):

    def test_create_comment_success(self) -> None:
        account = self.create_test_account()
        task = self.create_test_task(account_id=account.id)

        created_comment = CommentService.create_comment(
            params=CreateCommentParams(
                account_id=account.id, task_id=task.id, content=self.DEFAULT_COMMENT_CONTENT
            )
        )

        assert created_comment.id is not None
        assert created_comment.task_id == task.id
        assert created_comment.account_id == account.id
        assert created_comment.content == self.DEFAULT_COMMENT_CONTENT

    def test_get_comment_success(self) -> None:
        account = self.create_test_account()
        task = self.create_test_task(account_id=account.id)
        created_comment = self.create_test_comment(account_id=account.id, task_id=task.id)

        retrieved_comment = CommentService.get_comment(
            params=GetCommentParams(account_id=account.id, task_id=task.id, comment_id=created_comment.id)
        )

        assert retrieved_comment.id == created_comment.id
        assert retrieved_comment.task_id == created_comment.task_id
        assert retrieved_comment.account_id == created_comment.account_id
        assert retrieved_comment.content == created_comment.content

    def test_get_comment_not_found(self) -> None:
        account = self.create_test_account()
        task = self.create_test_task(account_id=account.id)
        non_existent_comment_id = "507f1f77bcf86cd799439011"

        try:
            CommentService.get_comment(
                params=GetCommentParams(
                    account_id=account.id, task_id=task.id, comment_id=non_existent_comment_id
                )
            )
            assert False, "Expected CommentNotFoundError"
        except CommentNotFoundError as e:
            assert e.message == f"Comment with id {non_existent_comment_id} not found."

    def test_update_comment_success(self) -> None:
        account = self.create_test_account()
        task = self.create_test_task(account_id=account.id)
        created_comment = self.create_test_comment(account_id=account.id, task_id=task.id)

        updated_comment = CommentService.update_comment(
            params=UpdateCommentParams(
                account_id=account.id,
                task_id=task.id,
                comment_id=created_comment.id,
                content="Updated Content",
            )
        )

        assert updated_comment.id == created_comment.id
        assert updated_comment.content == "Updated Content"

    def test_update_comment_not_found(self) -> None:
        account = self.create_test_account()
        task = self.create_test_task(account_id=account.id)
        non_existent_comment_id = "507f1f77bcf86cd799439011"

        try:
            CommentService.update_comment(
                params=UpdateCommentParams(
                    account_id=account.id,
                    task_id=task.id,
                    comment_id=non_existent_comment_id,
                    content="Updated Content",
                )
            )
            assert False, "Expected CommentNotFoundError"
        except CommentNotFoundError as e:
            assert e.message == f"Comment with id {non_existent_comment_id} not found."

    def test_delete_comment_success(self) -> None:
        account = self.create_test_account()
        task = self.create_test_task(account_id=account.id)
        created_comment = self.create_test_comment(account_id=account.id, task_id=task.id)

        deletion_result = CommentService.delete_comment(
            params=DeleteCommentParams(
                account_id=account.id, task_id=task.id, comment_id=created_comment.id
            )
        )

        assert deletion_result.success is True
        assert deletion_result.comment_id == created_comment.id
        assert deletion_result.deleted_at is not None

        try:
            CommentService.get_comment(
                params=GetCommentParams(account_id=account.id, task_id=task.id, comment_id=created_comment.id)
            )
            assert False, "Expected CommentNotFoundError after deletion"
        except CommentNotFoundError:
            pass

    def test_delete_comment_not_found(self) -> None:
        account = self.create_test_account()
        task = self.create_test_task(account_id=account.id)
        non_existent_comment_id = "507f1f77bcf86cd799439011"

        try:
            CommentService.delete_comment(
                params=DeleteCommentParams(
                    account_id=account.id, task_id=task.id, comment_id=non_existent_comment_id
                )
            )
            assert False, "Expected CommentNotFoundError"
        except CommentNotFoundError as e:
            assert e.message == f"Comment with id {non_existent_comment_id} not found."

    def test_get_paginated_comments_empty(self) -> None:
        account = self.create_test_account()
        task = self.create_test_task(account_id=account.id)
        from modules.application.common.types import PaginationParams

        pagination_result = CommentService.get_paginated_comments(
            params=GetPaginatedCommentsParams(
                account_id=account.id,
                task_id=task.id,
                pagination_params=PaginationParams(page=1, size=10, offset=0),
            )
        )

        assert len(pagination_result.items) == 0
        assert pagination_result.total_count == 0

    def test_get_paginated_comments_with_comments(self) -> None:
        account = self.create_test_account()
        task = self.create_test_task(account_id=account.id)
        self.create_multiple_test_comments(account_id=account.id, task_id=task.id, count=5)
        from modules.application.common.types import PaginationParams

        pagination_result = CommentService.get_paginated_comments(
            params=GetPaginatedCommentsParams(
                account_id=account.id,
                task_id=task.id,
                pagination_params=PaginationParams(page=1, size=10, offset=0),
            )
        )

        assert len(pagination_result.items) == 5
        assert pagination_result.total_count == 5

