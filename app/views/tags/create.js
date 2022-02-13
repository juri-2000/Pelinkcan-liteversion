$("#select2-link_link_tag_tag_id-results").html("<%= j(render 'index', { comments: @comment.item.comments }) %>")
$("#tag_name").val('')