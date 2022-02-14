class LinksController < ApplicationController


    def new
      @link = Link.new
      @linktag = LinkTag.new
      @linktags = LinkTag.all
      @tag = Tag.new #タグをユーザーに持たせるか
      @tags = Tag.where(user_id: current_user)
    end
    
    def create
      @link = Link.new(link_params)
      @link.user_id = current_user.id
      if @link.save
      redirect_to links_path
      else
      render :new
      end
    end
    
    def edit
       @link = Link.find(params[:id])
    end
    
    def update
      @link = Link.find(params[:id])
      @link.user_id = current_user.id
      if @link.update(link_params)
      redirect_to links_path
      else
      render :edit
      end
    end
    
    def index
       @links = Link.all.where(user_id: current_user)
    end
    
    def destroy
       link=Link.find(params[:id])
       link.destroy
       redirect_to links_path
    end 
    
  private

    def link_params
      params.require(:link).permit(:title,:url,:body,:color)
    end

    
end
