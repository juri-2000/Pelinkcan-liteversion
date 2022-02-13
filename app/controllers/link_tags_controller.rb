class LinkTagsController < ApplicationController
  def create
    @link = Link.find(params[:id])
    linktag = current_user.linktags.new(link_id: @link.id)
    linktag.save
    render :link
  end

  def destroy
    @link = Link.find(params[:id])
    linktag = current_user.linktags.new(link_id: @link.id)
    linktag.destroy
  end
end
