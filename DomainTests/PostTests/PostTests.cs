using System.Linq;
using Domain.Post;
using Xunit;

namespace DomainTests.PostTests
{
    public class PostTests
    {
        private Post Post => new Post();

        [Fact]
        public void GetTags__gets_tags_from_text() {
            var content = "lorem#tag1 ipsum dolor sit amet. #tag2";
            var tags = Post.GetTags(content).ToList();

            Assert.Equal("tag1", tags[0].Name);
            Assert.Equal("tag2", tags[1].Name);
        }

        [Fact]
        public void GetTags__tags_are_distinctive() {
            var content = "lorem #tag1 #tag1 ipsum #tag1 dolor sit #tag2 amet. #tag2";
            var tags = Post.GetTags(content).ToList();

            Assert.Equal("tag1", tags[0].Name);
            Assert.Equal("tag2", tags[1].Name);
        }
    }
}