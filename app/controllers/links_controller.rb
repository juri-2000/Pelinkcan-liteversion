class LinksController < ApplicationController

    
    def new
      @link = Link.new
      @linktag = LinkTag.new
      @linktags = LinkTag.all
      @tag = Tag.new #タグをユーザーに持たせるか
      @tags = Tag.where(user_id: current_user)
    end
    
    def create
      link = Link.new(link_params)
      link.user_id = current_user.id
      link.save
      redirect_to link_path(link.id)
    end
    
    def show
       @links = Link.all.where(user_id: current_user)
       @link=Link.find(params[:id])
    end
    
    def destroy
       link=Link.find(params[:id])
       link.destroy
       redirect_to link_path(current_user.id)
    end 
    
  private

    def link_params
      params.require(:link).permit(:title,:url,:body,:color)
    end

    
end
