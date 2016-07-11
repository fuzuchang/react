/**
 * Created by fuzuc on 2016-07-11.
 */
ReactDOM.render(
    <h1>Why React.js?</h1>,
    $("#example")[0]
);


/**
 * 创建一个新的 React  CommentBox组件
 */
var CommentBox = React.createClass({

    loadData:function () {
        var self = this;
        $.get(this.props.url,{},function (json) {
            self.setState({data: json});
        },'json');
    },
    handleCommentSubmit: function(comment) {
        var self = this;
        $.post(this.props.suburl,comment,function (json) {
            self.setState({data: json});
        },'json');
    },
    getInitialState:function () {
      return {data:[]};
    },

    componentDidMount:function () {
        this.loadData();
        // setInterval(this.loadData,this.props.pollTime);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>评论</h1>
                <CommentList data = {this.state.data} />
                <CommentForm  onCommentSubmit={this.handleCommentSubmit}  />
            </div>
        );
    }
}),CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (item,index) {
            return (
                <Comment key={index} author={item.author} date={item.on_time}>
                    {item.content}
                </Comment>
            );
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );

    }
}), CommentForm = React.createClass({
    handleSubmit:function (e) {
        e.preventDefault();
        var author = this.refs.author.value.trim();
        var content = this.refs.content.value.trim();
        this.props.onCommentSubmit({author: author, content: content,action:'comment'});
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="名称"  ref="author"/>
                <input type="text" placeholder="说点什么吧..."  ref="content"/>
                <input type="submit" value="提交" />
            </form>
        );
    }
});

var Comment = React.createClass({

    rawMarkup:function () {
        var rawMarkup = marked(this.props.children.toString(),{sanitize:true});
        return {
            __html:rawMarkup
        };
    },

    render : function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML = {this.rawMarkup()}  />
                <span>{this.props.date}</span>
            </div>
        );
    }
});


ReactDOM.render(
    <CommentBox url="news.php?action=comment-list" suburl="news.php?action=comment"  pollTime={2000} />,
    $("#comment-box")[0]
);

