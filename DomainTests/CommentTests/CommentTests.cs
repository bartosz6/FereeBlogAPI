using Domain.Comment;
using Xunit;
using System.Linq;
using System;

namespace DomainTests.CommentTests
{
    public class CommentTests
    {
        [Fact]
        public void AddChildrenComment__adding_new_comment_increments_collection() 
        {
            var newComment = new Comment();
            var oldComment = new Comment();

            oldComment.AddChildrenComment(newComment);
            Assert.Equal(oldComment.Childrens.ToList().Count, 1);
        }

        [Fact]
        public void AddChildrenComment__does_not_allow_to_add_duplicate()
        {
            var newComment = new Comment();
            var oldComment = new Comment();

            oldComment.AddChildrenComment(newComment);
            
            Exception ex = Assert.Throws<InvalidOperationException>(
                    () => oldComment.AddChildrenComment(newComment)
                );

            Assert.Equal("Duplicated comment", ex.Message);
        }

        [Fact]
        public void AddChildrenComment__does_not_allow_to_add_loop()
        {
            var newComment = new Comment();
            
            Exception ex = Assert.Throws<InvalidOperationException>(
                    () => newComment.AddChildrenComment(newComment)
                );

            Assert.Equal("Looped comment", ex.Message);
        }
    }
}